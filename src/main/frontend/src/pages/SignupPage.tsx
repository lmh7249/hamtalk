import {AuthPageLayouts} from "../styles/layouts/PageLayouts";
import SignupContainer from "../containers/SignupContainer";
import ProgressIndicator from "../components/signup/ProgressIndicator";
import {useParams} from "react-router-dom";
import exp from "node:constants";
import questions from '../data/signupQuestions.json'

const SignupPage = () => {

    const params = useParams();
    // 라우터에 url에 넘어온 변수를 확인하는 함수
    // 아래에 params.요소로 값을 받음.
    // step에 값을 대입해서 url 변경시 화면이 동적으로 변경되게 함.
    const stepParam = params.step;
    const step: number = stepParam ? parseInt(stepParam, 10) : 0;
    const isValidStep = !isNaN(step);
    const lastStep = questions.length;
    console.log("마지막 페이지는?", lastStep);

    console.log("params:", params, "step:", step, "isValidStep:", isValidStep);

    return (
        <AuthPageLayouts>
            <ProgressIndicator step={step} lastStep = {lastStep}/>
            <SignupContainer step={step}/>
        </AuthPageLayouts>

    )
}

export default SignupPage