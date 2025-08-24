import type{ NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import { client } from "@/db";
import bcrypt from "@node-rs/bcrypt"
import {encode as defaultEncode} from "next-auth/jwt"
import { randomUUID } from "crypto";
import { addDays } from "date-fns";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
 const options = {
    adapter:MongoDBAdapter(client),
    session:{
        strategy:"database" as const 
    },
    providers : [Google({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        authorization : {
            params : {
                prompt:"consent",
                access_type:"offline",
                response_type:"code"
            }
        }
    }),
Credentials({
    name:"Credentials",
    credentials:{
        phone:{},
        password:{}
    },
    async authorize(credentials: Partial<Record<"phone" | "password", unknown>>, req?: any): Promise<any> {
        const phone = typeof credentials.phone === "string" ? credentials.phone : "";
        const password = typeof credentials.password === "string" ? credentials.password : "";

        //input validation
        if (!phone || phone.length !== 10 || !password) {
            return null;
        }

        console.log("authorize ----", phone, password)

        //db call for user - exist in the database 
        let db = (await client).db("cart");
        let users = db.collection("users");
        let ExistingUser = await users.findOne({
            phone
        })
        // if yes then returning early and giving the user 
        if (ExistingUser) {
            console.log("user exist in the db", ExistingUser)
            let passwordTest = bcrypt.compareSync(password, ExistingUser.hashPassword)
            if(!passwordTest) {
                return null;
            }
            return {id:ExistingUser._id, name:ExistingUser.name, phone:ExistingUser.phone, email:ExistingUser.email, emailVerified:ExistingUser.emailVerified || ""}
        }
        // if not creating one in the database

        let hashPassword = bcrypt.hashSync(password, 10)

        let createdUser = await users.insertOne({
            phone, email:"", name:"", hashPassword, emailVerified:null
        })

        const user = { id:createdUser.insertedId,name:"", phone, email:"", emailVerified:null}; // Example user object
        console.log(
            "newly created user", user
        )
        return user;
    }
})],
    callbacks:{
         async jwt({token, user, account}:{token:any, user:any, account?:any}) {

            if(user) {
                token.id = user.id
            }

            if(account?.provider == "credentials") {
                token.credentials = true;
            }

            return token
         },
         async session({session, user}:{session:any, user:any}) {
            if(session.user && user.id) {
                session.user.id = user.id ;
            }
            return session;
         }
    },
    jwt: {
        async encode(params) {

           try {
             if(params.token?.credentials) {
                let sessionToken = randomUUID();
                let expires = addDays(new Date(), 7);
                if(!params.token.id) {
                    throw  new Error("No user id in the TOKEN")
                }
                if (options.adapter && typeof options.adapter.createSession === "function") {
                    let createSession = await options.adapter.createSession({
                        sessionToken,
                        expires,
                        userId: String(params.token.id)
                    });

                if(!createSession) {
                        throw new Error("Failed to create Session")
                }
                    return sessionToken;    
                }

            }
           }catch (err) {
            console.log(err)
           }

            return defaultEncode(params)
        }
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/login",
        newUser:"/dashboard" // dashboard checking for other information like 2FA, MFA, data required - forcing user to provide the data
    }
} satisfies NextAuthConfig

export default options;