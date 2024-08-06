import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";

export default function SMSLogIn() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="number"
          placeholder="핸드폰 번호를 입력하세요"
          required={true}
          errors={["잘못된 입력입니다"]}
        />
        <FormInput
          type="number"
          placeholder="Verification code"
          required={true}
          errors={["잘못된 입력입니다"]}
        />
        <FormButton loading={false} text="Verify" />
      </form>
    </div>
  );
}
