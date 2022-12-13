import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/token.type';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}
    
    async signup(dto: SignupDto): Promise<Tokens> {
        const hash = await this.hashData(dto.password)
        const lecturer = await this.prisma.lecturer.create({
            data: {
                password: hash,
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName
            }
        });

        const tokens = await this.getTokens(lecturer.id, lecturer.email)
        await this.updateRTHash(lecturer.id, tokens.refreshToken)
        return tokens
    }

    async signin(dto: SigninDto) {
        const user = await this.prisma.lecturer.findUnique({
            where: {
                email: dto.email
            }   
        })

        if(!user) throw new ForbiddenException("Access denied!")

        const id = user.id;

        const passwordMatches = await bcrypt.compare(dto.password, user.password)
        if(!passwordMatches) throw new ForbiddenException("Access denied!")
        
        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRTHash(user.id, tokens.refreshToken)
        
        return {tokens, id}
    }

    async logout(id: string) {
        await this.prisma.lecturer.updateMany({
            where: {
                id,
                refreshToken: {
                    not: null
                }
            },
            data: {
                refreshToken: null
            }
        })
    }

    async refresh(refreshToken: string, id: string) {
        const user = await this.prisma.lecturer.findUnique({
            where: {
                id
            }
        })

        if(!user || !user.refreshToken) throw new ForbiddenException("Access Denied!")

        const rtMatches = await bcrypt.compare(refreshToken, user.refreshToken)
        if(!rtMatches) throw new ForbiddenException("Access Denied!")

        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRTHash(user.id, tokens.refreshToken)
        return tokens
    }

    /*
     * Utility Functions
    */
    async hashData(data: string) {
        return bcrypt.hash(data, 10);
    }

    async getTokens(userId: string, email: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email
            }, {
                secret: process.env.AT_SECRET,
                expiresIn: 60*15, 
            }),
            this.jwtService.signAsync({
                sub: userId,
                email
            }, {
                secret: process.env.RT_SECRET,
                expiresIn: 60*60*24*7, 
            })
        ])
        return {
            accessToken: at,
            refreshToken: rt,
        }
    } 

    async updateRTHash(userId: string, rt: string) {
        const hash = await this.hashData(rt)
        await this.prisma.lecturer.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: hash
            }
        })
    }
}
