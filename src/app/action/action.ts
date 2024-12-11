"use server";
import { AuthError } from "next-auth";
import { signIn } from "../../../auth";

// export async function doLessonAdd(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     // write a axios post to backend
//     const response = await axiosAPI.post(
//       `${APIeEndPoints.lesson}/create-lesson`,
//       JSON.stringify(formData),
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (response.data.success) {
//       return {
//         message: "Lesson added successfully.",
//       };
//     } else {
//       throw new Error("Failed to add Lesson.");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// 👉 Authenticate user
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
