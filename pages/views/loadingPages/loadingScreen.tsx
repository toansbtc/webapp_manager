import React from "react";
import { useLoading } from "./loadingContext";

export default function LoadingScreen() {
    const { isLoading } = useLoading();

    return (
        isLoading &&
        (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                    color: "#fff",
                    fontSize: "24px",
                }}
            >
                Loading...
            </div>

        )

    );
};

