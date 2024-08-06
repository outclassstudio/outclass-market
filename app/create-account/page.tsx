import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in th form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="text"
          placeholder="아이디를 입력하세요"
          required={true}
          errors={["잘못된 입력입니다"]}
        />
        <FormInput
          type="email"
          placeholder="이메일을 입력하세요"
          required={true}
          errors={["잘못된 입력입니다"]}
        />
        <FormInput
          type="password"
          placeholder="비밀번호를 입력하세요"
          required={true}
          errors={["잘못된 입력입니다"]}
        />
        <FormInput
          type="password"
          placeholder="비밀번호를 한번 더 입력하세요"
          required={true}
          errors={["잘못된 입력입니다"]}
        />
        <FormButton loading={false} text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
