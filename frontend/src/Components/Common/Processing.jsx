import styled from 'styled-components/macro'

export default function Processing() {
  const ProcessingStyle = styled.div`
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid #fff;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent transparent transparent;
    }
    div:nth-child(1) {
      animation-delay: -0.3s;
    }
    div:nth-child(2) {
      animation-delay: -0.2s;
    }

    div:nth-child(3) {
      animation-delay: -0.1s;
    }

    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `
  return (
    <ProcessingStyle className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </ProcessingStyle>
  )
}
