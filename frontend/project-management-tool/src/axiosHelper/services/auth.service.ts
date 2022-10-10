// import axios from "axios";
// import { baseUrlApi } from "../index";

// interface Register {
//   name: string;
//   email: string;
//   password: string;
// }

// class AuthService {
//   login(name: string, password: string) {
//     return axios
//       .post(`${baseUrlApi} signin`, { name, password })
//       .then((response) => {
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }

//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem("user");
//   }

//   async register({ name, email, password }: Register) {
//     try {
//       const res = await axios.post(`${baseUrlApi} signup`, {
//         name,
//         email,
//         password,
//       });
//       return res;
//     } catch (err: any) {
//       throw err;
//     }
//   }
// }

// export default new AuthService();
