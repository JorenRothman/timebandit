export async function keypress() {
    process.stdin.setRawMode(true);
    return new Promise((resolve) =>
        process.stdin.once('data', () => {
            process.stdin.setRawMode(false);
            resolve(true);
        })
    );
}
