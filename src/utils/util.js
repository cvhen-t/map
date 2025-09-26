import * as fs from 'fs';
export function addpage() {
    console.log(fs);
}

export const loadScript = (src, callback) => {
    let js = document.createElement('script');
    js.onload = () => {
        callback && callback();
    };
    js.src = src;
    document.body.appendChild(js);
};
