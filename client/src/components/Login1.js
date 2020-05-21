  // import React, { useRef } from 'react'
  // import { axiosInstance } from '../utils/axiosInstance'
  // import { useForm } from "react-hook-form"
  // import { withOktaAuth } from '@okta/okta-react'
  // import { NavLink, useHistory } from 'react-router-dom'
  // import { useOktaAuth } from '@okta/okta-react/dist/OktaContext'



  // const Login = (props) => {
  //   const { authService, authState } = useOktaAuth()

  //   const history = useHistory()
  //   const { register, handleSubmit, reset, watch, errors } = useForm({
  //     validateCriteriaMode: "all"
  //   })
  //   const password = useRef('')
  //   password.current = watch('password', '')

  //   const onSubmit = (data) => {
  //     if (props.registration){
  //       const { name, email, password } = data
  //       const user = {
  //         name, 
  //         email,
  //         password
  //       }

  //       return axiosInstance()
  //               .post('/api/register', user)
  //               .then(res => {
  //                 console.log(res)
  //                 reset()
  //                 history.push('/login')
  //               })
  //     }

  //     axiosInstance()
  //         .post('/api/login', data)
  //         .then(res => {
  //           console.log(res)
            
  //           reset()
  //           history.push('/dashboard')
  //         })
  //   }

  //   return (
  //     <div>
  //       <form 
  //         onSubmit={handleSubmit(onSubmit)} 
  //         className="border border-blue-800 rounded-lg overflow-hidden w-1/3 mx-auto login-position shadow-lg"
  //       >
  //         <h1 className="text-3xl font-bold text-white p-4 bg-blue-800 tracking-wide bg-white">{props.registration ? "Register" : "Login"}</h1>

  //         <div className="p-4 bg-white">
  //           {props.registration &&
  //               <input 
  //                 type="text" 
  //                 name="name" 
  //                 placeholder="Name" 
  //                 ref={register({ required: true, maxLength: 30, minLength: 3})} 
  //                 className="block p-3 text-xl w-4/5 my-3 mx-auto rounded-lg focus:bg-white focus:outline-none focus:shadow-outline border-blue-600 border"
  //               />}
  //             {errors?.name?.types?.required && <p>Field required.</p>}      
            
  //           <input 
  //             type="text" 
  //             name="email" 
  //             placeholder="Email" 
  //             ref={register({ 
  //               required: true, 
  //               maxLength: 30, 
  //               minLength: 3,
  //               validate: val => {
  //                 return val.match(/^\S+@\S+\.\S+$/) || "Email address must be valid."
  //               }
  //             })} 
  //             className="block p-3 text-xl w-4/5 my-3 mx-auto rounded-lg focus:bg-white focus:outline-none focus:shadow-outline border-blue-600 border"
  //           />
  //           {errors?.email?.types?.required && <p>Field required.</p>}      
  //           {errors?.email?.types?.validate && <p>{errors?.email?.types?.validate}</p>}      
            
  //           <input 
  //             type="password" 
  //             name="password" 
  //             placeholder="Password" 
  //             ref={register({ required: true, maxLength: 20, minLength: 5})} 
  //             className="block p-3 text-xl w-4/5 my-3 mx-auto rounded-lg focus:bg-white focus:outline-none focus:shadow-outline border-blue-600 border"
  //           />
  //           {errors?.password?.types?.required && <p>Field required.</p>}
  //           {errors?.password?.types?.minLength && <p>Password must be 5 or more characters.</p>}
            
  //           {props.registration &&
  //               <input type="password" 
  //                 name="confirmPassword" 
  //                 placeholder="Confirm Password" 
  //                 ref={register({ 
  //                   required: true, 
  //                   validate: val => {
  //                       return val === password.current || "Passwords do not match."
  //                     }
  //                 })} 
  //                 className="block p-3 text-xl w-4/5 my-3 rounded-lg mx-auto rounded-lg focus:bg-white focus:outline-none focus:shadow-outline border-blue-600 border"
  //               />}
  //               {errors?.confirmPassword?.types?.required && <p>Field required.</p>}
  //               {errors?.confirmPassword?.types?.validate && <p>{errors?.confirmPassword?.types.validate}</p>}

  //           <button type="submit" className="w-4/5 my-3 border-blue-600 border rounded-lg bg-blue-600 text-white text-xl font-bold py-3 mx-auto mb-8 block shadow-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:shadow-outline">{props.registration ? "Register" : "Login"}</button>

  //           <div className="flex justify-center my-5 w-full">
  //             <NavLink to="/register" className="w-2/5 block p-3 text-lg text-center text-white bg-blue-400" activeClassName="bg-blue-700" >Register</NavLink>
  //             <NavLink to="/login" activeClassName="bg-blue-700 " className="w-2/5 block p-3 text-lg text-center text-white bg-blue-400">Login</NavLink>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   )
  // }
