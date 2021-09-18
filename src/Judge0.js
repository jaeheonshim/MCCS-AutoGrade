export async function submission(code) {
    const body = {
        "source_code": code,
        "language_id": 75
    }

    const res = await fetch(`http://207.244.235.226:2358/submissions/?base64_encoded=true`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return await res.json();
}

export async function status(token) {
    const res = await (await fetch(`http://207.244.235.226:2358/submissions/${token}/?base64_encoded=true`));

    return await res.json();
}

export const StatusDefinition = {
    good: [1, 2, 3]
}