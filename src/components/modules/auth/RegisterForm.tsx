// import { useState } from "react";

// import { Material } from "@yakad/symbols";

// import RegisterEmailForm from "./RegisterEmailForm";
// import RegisterProfileForm from "./RegisterProfileForm";
// import RegisterProgress from "./RegisterProgress";
// import RegisterVerificationForm from "./RegisterVerificationForm";

// type RegisterStep = 1 | 2 | 3;

// interface RegisterData {
//     email: string;
//     verificationCode: string;
//     fullName: string;
//     username: string;
// }

// const initialRegisterData: RegisterData = {
//     email: "",
//     verificationCode: "",
//     fullName: "",
//     username: "",
// };

// const stepContent = {
//     1: {
//         title: "Create your account",
//         description: "Enter your email to get started.",
//         icon: "person_add",
//     },
//     2: {
//         title: "Verify your email",
//         description:
//             "We've sent a verification code to your email address.",
//         icon: "mail",
//     },
//     3: {
//         title: "Complete your profile",
//         description: "Add your name and choose a username.",
//         icon: "person",
//     },
// } as const;

// export default function RegisterForm() {
//     const [step, setStep] = useState<RegisterStep>(1);

//     const [data, setData] = useState<RegisterData>(
//         initialRegisterData,
//     );

//     function updateData(values: Partial<RegisterData>) {
//         setData((previous) => ({
//             ...previous,
//             ...values,
//         }));
//     }

//     function goToNextStep() {
//         setStep((previous) => {
//             if (previous === 3) {
//                 return previous;
//             }

//             return (previous + 1) as RegisterStep;
//         });
//     }

//     function goToPreviousStep() {
//         setStep((previous) => {
//             if (previous === 1) {
//                 return previous;
//             }

//             return (previous - 1) as RegisterStep;
//         });
//     }

//     function handleSubmit() {
//         console.log("Register data:", data);
//     }

//     const content = stepContent[step];

//     return (
//         <main className="flex min-h-screen w-full items-center justify-center bg-muted/30 px-4 py-8 sm:px-6">
//             <section className="w-full max-w-[440px]">
//                 <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
//                     <div className="px-6 pb-6 pt-8 sm:px-8 sm:pt-9">
//                         <div className="flex flex-col items-center text-center">
//                             <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
//                                 <Material
//                                     icon={content.icon}
//                                     className="size-6"
//                                 />
//                             </div>

//                             <h1 className="text-2xl font-semibold tracking-tight">
//                                 {content.title}
//                             </h1>

//                             <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
//                                 {content.description}
//                             </p>

//                             {step === 2 && (
//                                 <div className="mt-4">
//                                     <p className="text-sm font-medium">
//                                         {data.email}
//                                     </p>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="mt-8">
//                             <RegisterProgress step={step} />
//                         </div>
//                     </div>

//                     <div className="border-t px-6 py-6 sm:px-8 sm:py-8">
//                         {step === 1 && (
//                             <RegisterEmailForm
//                                 email={data.email}
//                                 onEmailChange={(email) =>
//                                     updateData({ email })
//                                 }
//                                 onContinue={goToNextStep}
//                             />
//                         )}

//                         {step === 2 && (
//                             <RegisterVerificationForm
//                                 email={data.email}
//                                 verificationCode={
//                                     data.verificationCode
//                                 }
//                                 onCodeChange={(verificationCode) =>
//                                     updateData({
//                                         verificationCode,
//                                     })
//                                 }
//                                 onVerify={goToNextStep}
//                                 onBack={goToPreviousStep}
//                             />
//                         )}

//                         {step === 3 && (
//                             <RegisterProfileForm
//                                 fullName={data.fullName}
//                                 username={data.username}
//                                 onFullNameChange={(fullName) =>
//                                     updateData({ fullName })
//                                 }
//                                 onUsernameChange={(username) =>
//                                     updateData({ username })
//                                 }
//                                 onBack={goToPreviousStep}
//                                 onSubmit={handleSubmit}
//                             />
//                         )}
//                     </div>
//                 </div>

//                 <p className="mt-6 text-center text-xs text-muted-foreground">
//                     By continuing, you agree to our terms and privacy
//                     policy.
//                 </p>
//             </section>
//         </main>
//     );
// }