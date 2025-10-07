import React, { useState } from "react";
import { Page, Text, Image, Document, StyleSheet, pdf, View } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

export default function IdCardGenerator() {
    const [name, setName] = useState<string>("");
    const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setPhotoDataUrl(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleDownloadPdf = async () => {
        if (!photoDataUrl) {
            alert("Silakan pilih foto terlebih dahulu!");
            return;
        }

        const blob = await pdf(
            <Document>
                <Page size={[524, 810]} style={styles.page}>
                    {/* Background template */}
                    <Image src="/idcard_template.png" style={styles.background} />

                    {/* Foto */}
                    {photoDataUrl && (
                        <View style={styles.photoWrapper}>
                            <Image src={photoDataUrl} style={styles.photo} />
                        </View>
                    )}

                    {/* Nama */}
                    <Text style={styles.name}>{name || "Nama Lengkap"}</Text>
                </Page>
            </Document>
        ).toBlob();

        saveAs(blob, `${name || "idcard"}.pdf`);
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
                    <h2
                        style={{
                            color: "#333",
                            fontWeight: 700,
                            fontSize: "22px",
                            marginBottom: "24px",
                        }}
                    >
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
                            border: "1px solid #ccc",
                            marginBottom: 20,
                        }}
                    />

                    <button
                        onClick={handleDownloadPdf}
                        style={{
                            background: "linear-gradient(135deg, #003A69, #0469BA)",
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

                {/* RIGHT SIDE - LIVE PREVIEW */}
                <div
                    style={{
                        flex: 1,
                        background: "linear-gradient(135deg, #003A69, #0469BA)",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "30px",
                    }}
                >
                    <div
                        style={{
                            width: 262,
                            height: 405,
                            position: "relative",
                            backgroundImage: "url('/idcard_template.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                            borderRadius: 12,
                        }}
                    >
                        {photoDataUrl && (
                            <img
                                src={photoDataUrl}
                                alt="preview"
                                style={{
                                    position: "absolute",
                                    top: "40%",
                                    left: "50%",
                                    transform: "translate(-50%, -30%)",
                                    width: 150,
                                    height: 150,
                                    borderRadius: "55%",
                                    objectFit: "cover",
                                    border: "3px solid #fff",
                                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                                }}
                            />
                        )}

                        <div
                            style={{
                                position: "absolute",
                                bottom: 25,
                                left: 0,
                                width: "100%",
                                textAlign: "center",
                                fontSize: 14,
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

// PDF STYLES
const styles = StyleSheet.create({
    page: {
        position: "relative",
        backgroundColor: "#fff",
    },
    background: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    photoWrapper: {
        position: "absolute",
        top: "20%",
        left: "17%",
        width: 350,
        height: 350,
        borderRadius: 200,
        overflow: "hidden",
        border: "3px solid #fff",
    },
    photo: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 200,
    },
    name: {
        position: "absolute",
        bottom: 55,
        left: 0,
        width: "100%",
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#222",
    },
});
