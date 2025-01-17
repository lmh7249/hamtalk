import styled from "styled-components";

type BarProps = {
    status: "pending" | "in-progress" | "done";
};

const Bar = styled.div<BarProps>`
    height: 8px;
    width: 120px;
    border-radius: 16px;
    background-color: ${({ status }) =>
            status === "pending"
                    ? "#E3E2E7"
                    : status === "in-progress"
                            ? "#ff527a"
                            : "#ffb6c1"};
`;
export default Bar;