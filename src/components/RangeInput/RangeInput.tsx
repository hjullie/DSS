import React, {ChangeEvent} from "react";
import {Slider, TextField} from "@material-ui/core";

import styles from "./RangeInput.module.css"

interface RangeInputProps {
    value?: (number | "")[];
    onChange: (value: (number | "")[]) => void;
}

export const RangeInput: React.FC<RangeInputProps> = ({value = ["", ""], onChange}) => {
    const onInputChange = React.useCallback((index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const itemValue = event.target.value;
        const newValue = [...value.slice(0, index), itemValue && Number(itemValue), ...value.slice(index + 1)]

        onChange(newValue);
    }, [onChange, value])

    // const onSliderChange = React.useCallback((_e: React.ChangeEvent<{}>, sliderValue: number | number[]) => {
    //     let newValue: (number | "")[];
    //
    //     if (value[0]) {
    //         if (value[1]) {
    //             newValue = sliderValue as number[];
    //         } else {
    //             newValue = [sliderValue as number, value[1]]
    //         }
    //     } else {
    //         if (value[1]) {
    //             newValue = [value[0], sliderValue as number];
    //         } else {
    //             newValue = ["", ""];
    //         }
    //     }
    //
    //     onChange(newValue);
    // }, [onChange, value])
    //
    // let sliderValue: number | number[] | undefined;
    // let minValue: number | undefined;
    // let maxValue: number | undefined;
    //
    // if (value[0]) {
    //     if (value[1]) {
    //         sliderValue = value as number[];
    //         minValue = value[0] - 10;
    //         maxValue = value[1] + 10;
    //     } else {
    //         sliderValue = value[0]
    //         minValue = value[0] - 10;
    //         maxValue = value[0] + 10;
    //     }
    // } else {
    //     if (value[1]) {
    //         sliderValue = value[1];
    //         minValue = value[1] - 10;
    //         maxValue = value[1] + 10;
    //     } else {
    //         sliderValue = 0;
    //     }
    // }

    return (
        <div className={styles.container}>
            {/*<Slider*/}
            {/*    value={sliderValue}*/}
            {/*    onChange={onSliderChange}*/}
            {/*    max={maxValue}*/}
            {/*    min={minValue}*/}
            {/*/>*/}
            <div className={styles.inputs}>
                <span className={styles.divider}>от</span>

                <TextField
                    type="number"
                    value={value[0]}
                    onChange={onInputChange(0)}
                />

                <span className={styles.divider}>–</span>

                <span className={styles.divider}>до</span>

                <TextField
                    type="number"
                    value={value[1]}
                    onChange={onInputChange(1)}
                />
            </div>
        </div>
    );
}
