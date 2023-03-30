import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Canvas() {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const keyLength = 20;
    const pianoLength = 52;
    const keys = { whiteKeys: {}, blackKeys: {}, pedal: 0 };

    function drawPiano(canvas: HTMLCanvasElement) {

        const context = canvas.getContext("2d");

        if (!context) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "10px sans-serif";


        for (let i = 0; i < pianoLength; i++) {
            context.beginPath();
            context.strokeStyle = "#000";
            context.rect(i * keyLength, 0, keyLength, keyLength * 8);
            context.stroke();
            // if (i in keys.whiteKeys) {
            //     context.fillStyle = "#" + keys.whiteKeys[i] + keys.whiteKeys[i] + keys.whiteKeys[i];
            //     context.fill();
            // }
            context.fillStyle = "#000";

            const key = (i + 5) % 7;

            if (key == 0) {
                context.fillText("C" + (i + 5) / 7, (i * keyLength) + 4, keyLength * 7.8);
            }

        }


        for (let i = 0; i < pianoLength; i++) {
            context.beginPath();

            const key = (i + 6) % 7;

            if (key == 0 || key == 3 || i + 1 == pianoLength) {
                continue;
            }

            context.strokeStyle = "#000";
            context.fillStyle = "#000";
            context.rect((i * keyLength) + keyLength * 0.7, 0, keyLength * 0.6, keyLength * 5);
            // if (i in keys.blackKeys) {
            //     context.fillStyle = "#" + keys.blackKeys[i] + keys.blackKeys[i] + keys.blackKeys[i];
            // }
            context.fill();
            context.stroke();
        }

        context.beginPath();
        context.strokeStyle = "#000";
        context.rect(keyLength * 53, 5, keyLength * 3, keyLength * 5);

        if (keys.pedal) {
            context.fillStyle = "#00ff00";
            context.fill();
        } else {
            context.fillStyle = "#fff";
            context.fill();
        }

        context.stroke();

        context.fillStyle = "#000";
        context.font = "24px sans-serif";
        context.fillText("Ped.", (keyLength * 53) + 6, keyLength * 4);
    }


    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        console.log("canvas", canvas);

        drawPiano(canvas);
    }, []);

    return (
        <View style={styles.container}>
            <canvas width="1125" height="165" ref={canvasRef}></canvas>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export { Canvas };
