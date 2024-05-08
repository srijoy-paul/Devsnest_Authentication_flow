import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import SignupForm from "./_form/SignupForm";
import type { UserFormData } from "./_form/SignupForm";
import { api } from "~/trpc/server";

function Signup() {
  // const { createUser, isLoading } = useCreateUser();
  async function handleFormSubmit(formData: UserFormData) {
    "use server";
    console.log("hello");

    // console.log(formData);
    // const response = await api.auth.signup(formData);
    // console.log(response);
  }
  return (
    <div className="flex h-full border-2 border-red-300">
      <Card className="m-auto space-y-3 md:w-[400px]">
        <CardHeader>
          <CardTitle className="text-center font-semibold">
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <SignupForm handleformSubmit={handleFormSubmit} />
        </CardContent>
        <CardFooter className="flex items-center justify-center  pb-10 text-xs">
          <span className=" ">
            Have an Account? <span className="font-semibold">LOGIN</span>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
