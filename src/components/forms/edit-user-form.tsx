"use client";
import ServerSubmitButton from "../styled-components/server-submit-button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// "name": {
//             "firstName": "Tawhid",
//             "lastName": "Ul Islam"
//         },
//         "password":"lerner123",
//         "gender": "male",
//         "email": "tawhidfdulislam@gmail.com"
// type TInputs = {
//   title: string;
//   lessonNo: string;
// };

// async function updateLesson(
//   url: string,
//   { arg }: { arg: { lessonId: string; data: TInputs } }
// ) {
//   // Make the API call to update the lesson
//   await axiosAPI.patch(
//     `${APIeEndPoints.lesson}/${arg.lessonId}/update`,
//     arg.data
//   );
// }

export default function EditUser() {
  // const { trigger, isMutating } = useSWRMutation("/lesson", updateLesson);

  // ** destructing the react-hook-method
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<TInputs>();

  // console.log(errors);

  // ** Getting the form sumption
  // const onSubmit: SubmitHandler<TInputs> = async (data) => {
  //   try {
  //     await trigger({ lessonId: lesson._id, data });
  //     mutate(APIeEndPoints.lesson); // Revalidate the lesson list
  //   } catch (error) {
  //     toast(`Error updating lesson: ${JSON.stringify(error)}`);
  //   }
  // };

  return (
    <form>
      <div className="grid gap-4 py-4">
        <div className="space-y-1">
          <Label htmlFor="title" className="">
            Lesson Title
          </Label>
          <Input
            id="title"
            placeholder="Title"
            // defaultValue={lesson.title || ""}
            // {...register("title", { required: true })}
            className=""
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lessonNo" className="text-right">
            Lesson Number
          </Label>
          <Input
            id="lessonNo"
            placeholder="Lesson Number"
            // defaultValue={lesson.lessonNo || ""}
            // {...register("lessonNo", { required: true })}
          />
        </div>
      </div>
      <DialogFooter>
        <ServerSubmitButton aria-disabled>Save Changes</ServerSubmitButton>
      </DialogFooter>{" "}
    </form>
  );
}
