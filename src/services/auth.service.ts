import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser, UserRole } from '../models/user.model';
import { RegisterUserDto, LoginUserDto, AuthResponseDto } from '../dtos/auth.dto';
import { logger } from '../utils/logger';

export class AuthService {
  static async register(userData: RegisterUserDto): Promise<AuthResponseDto> {
    const { name, email, password, role = UserRole.CLIENT } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    // Generate JWT
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  static async login(loginData: LoginUserDto): Promise<AuthResponseDto> {
    const { email, password } = loginData;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  private static generateToken(user: IUser): string {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h'
    });
  }
}