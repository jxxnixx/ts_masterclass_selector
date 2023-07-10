///// 6.0 Get Selectors

// atom.tsx

import {atom, selector} from "recoil";

export const minuteState = atom({
    key : "minutes",
    default : 0,
});

export const hourSelector = selector({
    key : "hours",
    get : ({ get }) => {
        const minutes = get(minuteState);
        return minutes/60;
    },
});

// App.tsx

import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {hourSelector, minuteState} from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);
  const onMinutesChange = (event : React.FormEvent<HTMLInputElement>) => {
    setMinutes( + event.currentTarget.value);
    // + 는 string을 number로 바꾸게 해줌!
  };

  return (
    <div>
      <input
        value = {minutes}
        onChange = {onMinutesChange}
        type = "number"
        placeholder="Minutes"
      />
      <input value = {hours} type = "number" placeholder="Hours" />
    </div>
  );
}

///// 6.1 set Selectors

// atom.tsx

import {atom, selector} from "recoil";

export const minuteState = atom({
    key : "minutes",
    default : 0,
});

export const hourSelector = selector({
    key : "hours",
    get : ({ get }) => {
        const minutes = get(minuteState);
        return minutes/60;
    },
    set : ({ set }, newValue) => {
        const minutes = Number(newValue) * 60;
        set(minuteState, minutes);
        console.log(newValue)
    },
    // set : selector의 또 다른 속성으로, state를 set 하는 것을 도와줌.
    // 즉, atom을 수정하는 걸 도와줌.
    // get 함수 내부에서도 get 함수에 접근할 수 있었듯이,
    // set 함수 내부에서도 set 함수에 접근할 수 있음.

    // 여기서는, hours input이 minutes atom을 수정하는 역할을 하도록 할 것.
    // minutes input에 60을 적었을 때 hours에 1로 출력되는 것처럼,
    // hours input에 1을 적으면 minutes 에 60으로 출력되도록.

    // 위에 한 것처럼 state를 받아 와서 수정해서 리턴할 수도 있는데
    // 이렇게 할 수도 있음.

    // set의 첫 번째 인자는 option이라는 object를 주고
    // 두 번째 인자는 우리가 보내는 새로운 값임.
    // 하여튼 첫 번째 인자를 두 번째 인자로 바꾼다고 생각하면 편함!
});

// hourSelector 정의 시, ts에게 hourSelector가 무엇인지 알려줘야 에러가 사라짐!
// <number>이 그것.

// selector의 멋진 점 중 하나는, 하나의 atom만 get하거나 set하지 않아도 된다는 것.

// App.tsx

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinutesChange = (event : React.FormEvent<HTMLInputElement>) => {
    setMinutes( + event.currentTarget.value);
  };
  const onHoursChange = (event : React.FormEvent<HTMLInputElement>) => {
    setHours( + event.currentTarget.value);
  };

  return (
    <div>
      <input
        value = {minutes}
        onChange = {onMinutesChange}
        type = "number"
        placeholder="Minutes"
      />
      <input 
        value = {hours} 
        onChange = {onHoursChange}
        type = "number" 
        placeholder="Hours" 
      />
    </div>
  );
}
