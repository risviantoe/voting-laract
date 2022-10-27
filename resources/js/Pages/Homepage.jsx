import React from "react";
import { Head } from "@inertiajs/inertia-react";
import makeAnimated from "react-select/animated";
import SelectInput from "@/components/SelectInput";
import { useState } from "react";
import { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Modal from "@/components/Modal";
import ReactLoading from "react-loading";
import {
    BsFillCheckCircleFill,
    BsFillExclamationCircleFill,
    BsXCircleFill,
} from "react-icons/bs";

export default function Homepage(props) {
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isMax, setMax] = useState(false);
    const [isMin, setMin] = useState(false);

    const results = props.members.map((item) => {
        return {
            label: item.name,
            value: item.name,
        };
    });

    useEffect(() => {
        setMembers(results);
        if (props.flash.error) {
            setError(true);
            setLoading(false);
        }
        if (props.flash.success) {
            setSuccess(true);
            setLoading(false);
        }
    }, [props.members]);

    const [voted, setVoted] = useState([]);
    const [token, setToken] = useState(props.token);

    const onChange = (e) => {
        e.length > 5 && e.pop() && setMax(true);
        voted.length <= 4 && setVoted(e);
    };

    const onSubmit = () => {
        console.log(voted[0]?.value);
        const data = new FormData();
        data.append("pilihan1", voted[0]?.value || '');
        data.append("pilihan2", voted[1]?.value || '');
        data.append("pilihan3", voted[2]?.value || '');
        data.append("pilihan4", voted[3]?.value || '');
        data.append("pilihan5", voted[4]?.value || '');
        data.append("token", token);
        if (!voted[0]?.value) {
            setMin(true);
            setShowModal(false);
            return null;
        } else {
            Inertia.post("/polls", data);
        }
        setLoading(true);
        setShowModal(false);
    };

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen bg-slate-900 w-screen pt-10 pb-20">
            <Head title={props.title} />
            {/* Body */}
            {isLoading && (
                <div className="absolute z-20 w-screen h-full top-0 bg-slate-900/70 flex flex-col justify-center items-center">
                    <ReactLoading
                        type="bubbles"
                        color="white"
                        height={100}
                        width={"20%"}
                    />
                    <h2 className="text-xl">Validasi....</h2>
                </div>
            )}
            <div className="card w-full lg:w-8/12 shadow-xl bg-gray-800 border-y-4 border-accent overflow-visible">
                <div className="card-body px-5">
                    <h2 className="card-title font-bold text-white">
                        Silahkan tuliskan 5 orang yang anda pilih untuk menjadi
                        kandidat ketua IMMSA periode 2022-2024
                    </h2>
                    <p>Sebelum memilih silahkan baca peraturan dibawah ini:</p>
                    <div className="card w-full bg-gray-700 mt-4 mb-8 text-white">
                        <div className="card-body p-5">
                            <ol className="list-decimal px-3 font-light">
                                <li className="list-outside mb-2">
                                    Dalam pemilihan calon ketua minimal 1 &
                                    maksimal 5 orang.
                                </li>
                                <li className="list-outside mb-2">
                                    Silahkan tuliskan nama calon yang dipilih
                                    diusahakan nama lengkap.
                                </li>
                                <li className="list-outside mb-2">
                                    Dalam pemilihan calon ketua DIPERBOLEHKAN
                                    untuk memilih LAKI - LAKI maupun PEREMPUAN.
                                </li>
                                <li className="list-outside mb-2">
                                    Tidak diperbolehkan menulis nama yang sama
                                    lebih dari satu. Apabila hal tersebut
                                    terjadi maka akan tetap dihitung 1 suara.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className=" mb-5">
                        <div className="mb-8">
                            <p className="mb-3">Tulis pilihanmu:</p>

                            <SelectInput
                                isMulti
                                name={`pilihan`}
                                options={members}
                                onChange={(e) => onChange(e)}
                                value={voted}
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="token" className="mb-3">
                                Token
                            </label>
                            <input
                                id="token"
                                name="token"
                                type="text"
                                placeholder="Masukkan tokenmu"
                                className="input w-full bg-white"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="card-actions justify-center">
                        <button
                            className="btn btn-accent"
                            onClick={() => setShowModal(true)}
                        >
                            Submit
                        </button>
                    </div>
                    <Modal
                        show={showModal}
                        title="Apakah kamu yakin?"
                        body="Data yang sudah dikirim tidak dapat diubah. Silahkan cek kembali dan pastikan orang yang dipilih benar."
                        btnAction
                        textSubmit="SAYA SUDAH YAKIN!"
                        onClose={() => setShowModal(false)}
                        onSubmit={() => onSubmit()}
                    />
                    <Modal
                        show={isError}
                        isCentered
                        title="Token invalid"
                        body={props.flash.error}
                        onClose={() => setError(false)}
                    >
                        <BsXCircleFill
                            size={150}
                            className="mb-10"
                            color="#F87272"
                        />
                    </Modal>
                    <Modal
                        show={isSuccess}
                        isCentered
                        title="Data berhasil dikirim"
                        body={props.flash.success}
                        onClose={() => setSuccess(false)}
                    >
                        <BsFillCheckCircleFill
                            size={150}
                            className="mb-10"
                            color="#37CDBE"
                        />
                    </Modal>
                    <Modal
                        show={isMax}
                        isCentered
                        title="Stop maksimal 5 orang"
                        onClose={() => setMax(false)}
                    >
                        <BsFillExclamationCircleFill
                            size={150}
                            className="mb-10"
                            color="#F87272"
                        />
                    </Modal>
                    <Modal
                        show={isMin}
                        isCentered
                        title="Silahkan pilih minimal 1 orang"
                        onClose={() => setMin(false)}
                    >
                        <BsFillExclamationCircleFill
                            size={150}
                            className="mb-10"
                            color="#F87272"
                        />
                    </Modal>
                </div>
            </div>
        </div>
    );
}
