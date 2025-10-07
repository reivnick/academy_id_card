import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function IdCardGenerator() {
    const [name, setName] = useState<string>("");
    const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setPhotoDataUrl(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleDownloadPdf = async () => {
        if (!cardRef.current) return;

        const canvas = await html2canvas(cardRef.current, {
            scale: 5, // tingkatkan resolusi
            useCORS: true,
            backgroundColor: null,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [810, 524],
        });

        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "SLOW");
        pdf.save(`${name || "idcard"}.pdf`);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#f4f6fa",
                fontFamily: "Inter, sans-serif",
            }}
        >
            <div
                style={{
                    display: "flex",
                    width: "900px",
                    height: "700px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                }}
            >
                {/* LEFT SIDE - FORM INPUT */}
                <div
                    style={{
                        flex: 1,
                        background: "#ffffff",
                        padding: "40px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <h2 style={{ color: "#333", fontWeight: 700, fontSize: "22px", marginBottom: "24px" }}>
                        Buat ID Card
                    </h2>

                    <label style={{ fontSize: 14, color: "#444", marginBottom: 8 }}>Foto:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{
                            marginBottom: 16,
                            padding: 8,
                            borderRadius: 6,
                            border: "1px solid #ccc",
                        }}
                    />

                    <label style={{ fontSize: 14, color: "#444", marginBottom: 8 }}>Nama:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        style={{
                            padding: "10px 12px",
                            borderRadius: 6,
                            border: "1px solid #ddd",
                            marginBottom: 20,
                        }}
                    />

                    <button
                        onClick={handleDownloadPdf}
                        style={{
                            background: "linear-gradient(135deg, #ff6b4a, #ff3f7a)",
                            color: "#fff",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: 600,
                            letterSpacing: 0.5,
                        }}
                    >
                        Unduh ID Card (PDF)
                    </button>
                </div>

                {/* RIGHT SIDE - PREVIEW */}
                <div
                    style={{
                        flex: 1,
                        background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "30px",
                    }}
                >
                    <div
                        ref={cardRef}
                        style={{
                            width: 524,
                            height: 810,
                            transform: "scale(0.65)",
                            backgroundImage: "url('/idcard_template.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "absolute",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                        }}
                    >
                        {/* FOTO */}
                        {photoDataUrl && (
                            <img
                                src={photoDataUrl}
                                alt="foto"
                                style={{
                                    position: "absolute",
                                    top: 200,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: 350,
                                    height: 350,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    aspectRatio: 1,
                                    border: "3px solid #fff",
                                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                                }}
                            />
                        )}

                        {/* NAMA */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: 55,
                                left: 0,
                                width: "100%",
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: 700,
                                color: "#222",
                            }}
                        >
                            {name || "Nama Lengkap"}
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}
