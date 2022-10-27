import React from "react";

export default function Modal({
    show,
    title,
    body,
    textSubmit,
    onSubmit,
    onClose,
    btnAction,
    children,
    isCentered,
}) {
    if (!show) return null;
    return (
        <div className={`modal visible opacity-100 pointer-events-auto`}>
            <div className="modal-box bg-slate-700">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                    ✕
                </button>
                <div
                    className={`${
                        isCentered &&
                        "flex flex-col items-center justify-center"
                    }`}
                >
                    {children}
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className={`py-4 ${isCentered && "text-center"}`}>
                        {body}
                    </p>
                    {btnAction && (
                        <div className="modal-action justify-center">
                            <button
                                onClick={onSubmit}
                                className="btn btn-accent"
                            >
                                {textSubmit}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
