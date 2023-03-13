import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup.dto';
import { getMockReq, getMockRes } from '@jest-mock/express'

      describe('AuthController', () => {
        let mockAuthcontroller: AuthController;
        let mockAuthService = {
          login  : jest.fn(),
          create : jest.fn(),
          google : jest.fn(),
          facebook:jest.fn(),
          verifyAccount :jest.fn(), 
          forgotPassword :jest.fn(),
          resetPassword : jest.fn() 
        }
        beforeEach(async () => {
          const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
          }).overrideProvider(AuthService).useValue(mockAuthService).compile();
          mockAuthcontroller = moduleRef.get<AuthController>(AuthController);
        });
      // Constructor
      describe(('Constructor'),()=>{
        test('should be defined', () => {
          expect(mockAuthcontroller).toBeDefined();
        });
      })
      // Functions
      describe(('Function'),()=>{
        const mockSignUpUser = {
          email: 'test@test.com',
          firstName: 'testFirstName', 
          lastName: 'testLastName',
          password: 'testpassword',
          confirmPassword: 'testTonfirmPassword',
          role: 'testRole'
        }
        const mockReq = getMockReq({ locals :{
          params: {  },
          body: { user : 'User', email : 'test@test.com'},
          header:  {token: 'test-token'},
          query  : {query : '?{testtoken}'},
          url: {url : '/'},
          cookies: { token: "testToken" },
          headers: {
              Accept: 'text/plain'
          }
        }
        })

        const  mockRes  = getMockRes({ locals :{
          json:{},
          status:  {status : '200'},
          user : {user :'resTestUser'},
          token : {token : 'resTestToken'},
          message : {message : 'Test Successfull'}
        }})
        
        let mockUser = mockReq.user;
        let mockReqBody = mockReq.body;
        beforeEach(async () => {
          let next  =  jest.fn()
          next.mockReset()
        });
      // Login
      describe(('login'),()=>{
        beforeEach(async () => {
          jest.clearAllMocks();
        });
        test('should be defined', async () => {
          expect(await mockAuthcontroller.login).toBeDefined()
        });
        test('should not throw error', async () => {
          expect(mockAuthcontroller.login).not.toThrow()
        });
        test('should call mock authService', async () => {
          let loginResult = await mockAuthcontroller.login(mockReq);
          expect(mockAuthService.login).toBeCalled();
        });
        test('should call mock authService.login only once', async () => {
          let loginResult = await mockAuthcontroller.login(mockReq);
          expect(mockAuthService.login).toBeCalledTimes(1);
        });
        test('should call mock authService.login with mock params', async () => {
          mockAuthService.login.mockImplementation((mockUser,mockReqBody)=>{
            return ;
          })
          let loginResult = await mockAuthcontroller.login(mockReq);
          expect(mockAuthService.login).toBeCalledWith(mockUser,mockReqBody);
        });
        test('should call mock authService.login with mock output', async () => {
          mockAuthService.login.mockImplementation((mockUser,mockReqBody)=>{
            return Promise.resolve(mockRes.res);
          })
          let loginResult = await mockAuthcontroller.login(mockReq);
          expect(await mockAuthService.login(mockUser,mockReqBody)).toEqual(mockRes.res);
        });
        test('should return mock token', async () => {
          mockAuthService.login.mockImplementation((mockUser,mockReqBody)=>{
            return Promise.resolve(mockRes.res.locals.token);
          })
          let loginResult = await mockAuthcontroller.login(mockReq);
          expect(loginResult.token).toBe(mockRes.res.locals.token['token'])
        });
        test('should return mock user', async () => {
          mockAuthService.login.mockImplementation((mockUser,mockReqBody)=>{
            return Promise.resolve(mockRes.res.locals.user['user']);
          })
          let loginResult = await mockAuthcontroller.login(mockReq);
          expect(await mockAuthcontroller.login(mockReq)).toBe(mockRes.res.locals.user['user'])
        });
      })
      // Signup
      describe(('Signup'),()=>{

        beforeEach(async () => {
          jest.clearAllMocks();
        });
        test('should be defined', async () => {
          expect(await mockAuthcontroller.signUp).toBeDefined()
        });
        test('should not throw error', async () => {
          expect(mockAuthcontroller.signUp).not.toThrow()
        });
        test('should have mockSignUpUser to be instance of SignUpUserDto', async () => {
          const mockSignUpUser = new SignUpUserDto();
          expect(mockSignUpUser).toBeInstanceOf(SignUpUserDto)
        });
        test('should call mock authService', async () => {
          const mockSignUpUser = new SignUpUserDto();
          let signupResult = await mockAuthcontroller.signUp (mockSignUpUser);
          expect(await mockAuthService.create).toBeCalled();
        });
        test('should call mock authService.create only once', async () => {
          const mockSignUpUser = new SignUpUserDto();
          let signupResult = await mockAuthcontroller.signUp(mockSignUpUser);
          expect(await mockAuthService.create).toBeCalledTimes(1);
        });
        test('should call mock authService.create with mock params', async () => {
          const mockSignUpUser = new SignUpUserDto();
          mockAuthService.create.mockImplementation((mockSignUpUser)=>{
            return ;
          })
          await mockAuthcontroller.signUp(mockSignUpUser);
          expect(await mockAuthService.create).toBeCalledWith(mockSignUpUser);
        });
        test('should return mock output when promise get resolved', async () => {
          const mockSignUpUser = new SignUpUserDto();
          mockAuthService.create.mockImplementation((mockSignUpUser)=>{
            return Promise.resolve(mockRes.res.locals.user);
          })
          await expect(mockAuthcontroller.signUp(mockSignUpUser)).resolves.toEqual(mockRes.res.locals.user)      
        });
        test('should throw error when Promise of auth service get rejected', async () => {
          const mockSignUpUser = new SignUpUserDto();
          let errorMessage =  new Error("promise-rejected");
          mockAuthService.create.mockImplementation((mockSignUpUser)=>{
            return Promise.reject(errorMessage);
          })
          await expect(mockAuthService.create(mockSignUpUser)).rejects.toThrow(errorMessage)
        });
      })
      // google
      describe(('googleLogin'),()=>{
        let mockAccessToken = mockReq.header['token'];
        let errorMessage =  Error("promise-rejected");
        beforeEach(async () => {
          jest.clearAllMocks();
        });
        test('should be defined', async () => {
          expect(await mockAuthcontroller.googleLogin).toBeDefined()
        });
        test('should not throw error', async () => {
          expect(mockAuthcontroller.googleLogin).not.toThrow()
        });
        test('should call mock authService', async () => {
          await mockAuthcontroller.googleLogin(mockAccessToken);
          expect(await mockAuthService.google).toBeCalled();
        });
        test('should call mock authService only once', async () => {
          await mockAuthcontroller.googleLogin(mockAccessToken);
          expect(await mockAuthService.google).toBeCalledTimes(1);
        });
        test('should call mock authService with mock params', async () => {
          mockAuthService.google.mockImplementation((mockAccessToken)=>{
            return ;
          })
          await mockAuthcontroller.googleLogin(mockAccessToken)
          expect(await mockAuthService.google).toBeCalledWith(mockAccessToken);
        });
        test('should call mockAuthService with desired output from it when its promise get resolved', async () => {
          mockAuthService.google.mockImplementation((mockAccessToken)=>{
            return Promise.resolve(mockRes);
          })
          await expect(mockAuthService.google(mockAccessToken)).resolves.toEqual(mockRes)
        });
        test('should have error from mockAuthService with desired message from it when its promise get rejected', async () => {
          mockAuthService.google.mockImplementation((mockAccessToken)=>{
            return Promise.reject(errorMessage);
          })
          await expect(mockAuthService.google(mockAccessToken)).rejects.toEqual(errorMessage)
        });
        test('should return mock output when promise of mockAuthService get resolved', async () => {
          mockAuthService.google.mockImplementation((mockAccessToken)=>{
            return Promise.resolve(mockRes);
          })
          await expect(mockAuthcontroller.googleLogin(mockAccessToken)).resolves.toEqual(mockRes)      
        });
        test('should throw error when Promise of auth service get rejected', async () => {
          mockAuthService.google.mockImplementation((mockAccessToken)=>{
            return Promise.reject(errorMessage);
          })
          await expect(mockAuthcontroller.googleLogin(mockAccessToken)).rejects.toThrow(errorMessage)
        });
      })
      // facebook
        describe(('faceBookLogin'),()=>{
          let mockAccessToken = mockReq.header['token'];
          let errorMessage =  Error("promise-rejected");
          beforeEach(async () => {
            jest.clearAllMocks();
          });
          test('should be defined', async () => {
            expect(await mockAuthcontroller.faceBookLogin).toBeDefined()
          });
          test('should not throw error', async () => {
            expect(mockAuthcontroller.faceBookLogin).not.toThrow()
          });
          test('should call mock authService', async () => {
            await mockAuthcontroller.faceBookLogin(mockAccessToken);
            expect(await mockAuthService.facebook).toBeCalled();
          });
          test('should call mock authService only once', async () => {
            await mockAuthcontroller.faceBookLogin(mockAccessToken);
            expect(await mockAuthService.facebook).toBeCalledTimes(1);
          });
          test('should call mock authService with mock params', async () => {
            mockAuthService.facebook.mockImplementation((mockAccessToken)=>{
              return ;
            })
            await mockAuthcontroller.faceBookLogin(mockAccessToken)
            expect(await mockAuthService.facebook).toBeCalledWith(mockAccessToken);
          });
          test('should call mockAuthService with desired output from it when its promise get resolved', async () => {
            mockAuthService.facebook.mockImplementation((mockAccessToken)=>{
              return Promise.resolve(mockRes);
            })
            await expect(mockAuthService.facebook(mockAccessToken)).resolves.toEqual(mockRes)
          });
          test('should have error from mockAuthService with desired message from it when its promise get rejected', async () => {
            mockAuthService.facebook.mockImplementation((mockAccessToken)=>{
              return Promise.reject(errorMessage);
            })
            await expect(mockAuthService.facebook(mockAccessToken)).rejects.toEqual(errorMessage)
          });
          test('should return mock output when promise of mockAuthService get resolved', async () => {
            mockAuthService.facebook.mockImplementation((mockAccessToken)=>{
              return Promise.resolve(mockRes);
            })
            await expect(mockAuthcontroller.faceBookLogin(mockAccessToken)).resolves.toEqual(mockRes)      
          });
          test('should throw error when Promise of auth service get rejected', async () => {
            mockAuthService.facebook.mockImplementation((mockAccessToken)=>{
              return Promise.reject(errorMessage);
            })
            await expect(mockAuthcontroller.faceBookLogin(mockAccessToken)).rejects.toThrow(errorMessage)
          });
        })
      //Verify
        describe(('verifyAccount'),()=>{
          let mockParams = mockReq.query;
          let errorMessage =  Error("promise-rejected");
          beforeEach(async () => {
            jest.clearAllMocks();
          });
          test('should be defined', async () => {
            expect(await mockAuthcontroller.verifyAccount).toBeDefined()
          });
          test('should not throw error', async () => {
            expect(mockAuthcontroller.verifyAccount).not.toThrow()
          });
          test('should call mock authService', async () => {
            await mockAuthcontroller.verifyAccount(mockParams);
            expect(await mockAuthService.verifyAccount).toBeCalled();
          });
          test('should call mock authService only once', async () => {
            await mockAuthcontroller.verifyAccount(mockParams);
            expect(await mockAuthService.verifyAccount).toBeCalledTimes(1);
          });
          test('should call mock authService with mock params', async () => {
            mockAuthService.verifyAccount.mockImplementation((mockParams)=>{
              return ;
            })
            await mockAuthcontroller.verifyAccount(mockParams)
            expect(await mockAuthService.verifyAccount).toBeCalledWith(mockParams);
          });
          test('should call mockAuthService with desired output from it when its promise get resolved', async () => {
            mockAuthService.verifyAccount.mockImplementation((mockParams)=>{
              return Promise.resolve(mockRes);
            })
            await expect(mockAuthService.verifyAccount(mockParams)).resolves.toEqual(mockRes)
          });
          test('should have error from mockAuthService with desired message from it when its promise get rejected', async () => {
            mockAuthService.verifyAccount.mockImplementation((mockParams)=>{
              return Promise.reject(errorMessage);
            })
            await expect(mockAuthService.verifyAccount(mockParams)).rejects.toEqual(errorMessage)
          });
          test('should return mock output when promise of mockAuthService get resolved', async () => {
            mockAuthService.verifyAccount.mockImplementation((mockParams)=>{
              return Promise.resolve(mockRes);
            })
            await expect(mockAuthcontroller.verifyAccount(mockParams)).resolves.toEqual(mockRes)      
          });
          test('should throw error when Promise of auth service get rejected', async () => {
            mockAuthService.verifyAccount.mockImplementation((mockParams)=>{
              return Promise.reject(errorMessage);
            })
            await expect(mockAuthcontroller.verifyAccount(mockParams)).rejects.toThrow(errorMessage)
          });
        })
      //forgot-password
        describe(('forgotPassword'),()=>{
          let mockEmail = mockReq.body['email']
          let errorMessage =  Error("promise-rejected");
        beforeEach(async () => {
          jest.clearAllMocks();
        });
        test('should be defined', async () => {
          expect(await mockAuthcontroller.forgotPassword).toBeDefined()
        });
        test('should not throw error', async () => {
          expect(mockAuthcontroller.forgotPassword).not.toThrow()
        });
        test('should call mock authService', async () => {
          await mockAuthcontroller.forgotPassword(mockEmail);
          expect(await mockAuthService.forgotPassword).toBeCalled();
        });
        test('should call mock authService only once', async () => {
          await mockAuthcontroller.forgotPassword(mockEmail);
          expect(await mockAuthService.forgotPassword).toBeCalledTimes(1);
        });
        test('should call mock authService with mock params', async () => {
          mockAuthService.forgotPassword.mockImplementation((mockEmail)=>{
            return ;
          })
          await mockAuthcontroller.forgotPassword(mockEmail)
          expect(await mockAuthService.forgotPassword).toBeCalledWith(mockEmail);
        });
        test('should call mockAuthService with desired output from it when its promise get resolved', async () => {
          mockAuthService.forgotPassword.mockImplementation((mockEmail)=>{
            return Promise.resolve(mockRes);
          })
          await expect(mockAuthService.forgotPassword(mockEmail)).resolves.toEqual(mockRes)
        });
        test('should have error from mockAuthService with desired message from it when its promise get rejected', async () => {
          mockAuthService.forgotPassword.mockImplementation((mockEmail)=>{
            return Promise.reject(errorMessage);
          })
          await expect(mockAuthService.forgotPassword(mockEmail)).rejects.toEqual(errorMessage)
        });
        test('should return mock output when promise of mockAuthService get resolved', async () => {
          mockAuthService.forgotPassword.mockImplementation((mockEmail)=>{
            return Promise.resolve(mockRes);
          })
          await expect(mockAuthcontroller.forgotPassword(mockEmail)).resolves.toEqual(mockRes)      
        });
        test('should throw error when Promise of auth service get rejected', async () => {
          mockAuthService.forgotPassword.mockImplementation((mockEmail)=>{
            return Promise.reject(errorMessage);
          })
          await expect(mockAuthcontroller.forgotPassword(mockEmail)).rejects.toThrow(errorMessage)
        });
      })
      //reset-password/:token
      describe(('resetPassword'),()=>{
        let mockToken = mockReq.query['query'];
        let errorMessage =  Error("promise-rejected");
      beforeEach(async () => {
        jest.clearAllMocks();
      });
      test('should be defined', async () => {
        expect(await mockAuthcontroller.resetPassword).toBeDefined()
      });
      test('should not throw error', async () => {
        expect(mockAuthcontroller.resetPassword).not.toThrow()
      });
      test('should call mock authService', async () => {
        await mockAuthcontroller.resetPassword(mockToken,mockReqBody);
        expect(await mockAuthService.resetPassword).toBeCalled();
      });
      test('should call mock authService only once', async () => {
        await mockAuthcontroller.resetPassword(mockToken,mockReqBody);
        expect(await mockAuthService.resetPassword).toBeCalledTimes(1);
      });
      test('should call mock authService with mock params', async () => {
        mockAuthService.forgotPassword.mockImplementation((mockToken,mockReqBody)=>{
          return ;
        })
        await mockAuthcontroller.resetPassword(mockToken,mockReqBody)
        expect(await mockAuthService.resetPassword).toBeCalledWith(mockToken,mockReqBody);
      });
      test('should call mockAuthService with desired output from it when its promise get resolved', async () => {
        mockAuthService.resetPassword.mockImplementation((mockToken,mockReqBody)=>{
          return Promise.resolve(mockRes);
        })
        await expect(mockAuthService.resetPassword(mockToken,mockReqBody)).resolves.toEqual(mockRes)
      });
      test('should have error from mockAuthService with desired message from it when its promise get rejected', async () => {
        mockAuthService.resetPassword.mockImplementation((mockToken,mockReqBody)=>{
          return Promise.reject(errorMessage);
        })
        await expect(mockAuthService.resetPassword(mockToken,mockReqBody)).rejects.toEqual(errorMessage)
      });
      test('should return mock output when promise of mockAuthService get resolved', async () => {
        mockAuthService.resetPassword.mockImplementation((mockToken,mockReqBody)=>{
          return Promise.resolve(mockRes);
        })
        await expect(mockAuthcontroller.resetPassword(mockToken,mockReqBody)).resolves.toEqual(mockRes)      
      });
      test('should throw error when Promise of auth service get rejected', async () => {
        mockAuthService.resetPassword.mockImplementation((mockToken,mockReqBody)=>{
          return Promise.reject(errorMessage);
        })
        await expect(mockAuthcontroller.resetPassword(mockToken,mockReqBody)).rejects.toThrow(errorMessage)
      });
    })
})
});
