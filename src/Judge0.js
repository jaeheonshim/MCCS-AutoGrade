export async function submission(code, languageId) {
    const body = {
        "source_code": code,
        "redirect_stderr_to_stdout": true,
        "language_id": languageId
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

export const Languages = {
    "c": 50,
    "java": 62,
    "javascript": 63,
    "python": 71
}