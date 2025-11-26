import axios from "axios";

export async function downloadFromApi(path: string, filenameFallback = "cv.pdf") {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
    const res = await axios.get(url, { responseType: "blob" });

    // Backend "Content-Disposition: attachment; filename=..." gönderiyorsa adı buradan al
    const dispo = res.headers["content-disposition"] as string | undefined;
    let filename = filenameFallback;
    if (dispo) {
        const m = dispo.match(/filename\*=UTF-8''([^;]+)|filename="?([^"]+)"?/i);
        const enc = decodeURIComponent(m?.[1] || m?.[2] || "");
        if (enc) filename = enc;
    }

    const blob = new Blob([res.data], { type: res.headers["content-type"] || "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
}
