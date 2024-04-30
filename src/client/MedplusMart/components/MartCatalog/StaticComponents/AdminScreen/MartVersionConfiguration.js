import React from "react";

const MartVersionConfiguration = () => {

    return (
        <>
            <section className="container admin-screen">
                <div className="py-3">
                    <div>
                        <h3 className="h5">Mart Version Configuration</h3>
                    </div>
                    <div className=" d-flex justify-content-center p-4">
                        <div>
                            <table className="table table-responsive table-hover">
                                <thead>
                                    <tr className="bg-gray">
                                        <th>
                                            Key Name
                                        </th>
                                        <th className="text-center">
                                            Current Version
                                        </th>
                                        <th className="text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            COOKIE VERSION
                                        </td>
                                        <td className="text-center">
                                            7143
                                        </td>
                                        <td className="text-center">
                                            <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg">Increment</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            CSS VERSION
                                        </th>
                                        <td className="text-center">
                                            43
                                        </td>
                                        <td className="text-center">
                                            <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg">Increment</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            JS VERSION
                                        </th>
                                        <td className="text-center">
                                            38
                                        </td>
                                        <td className="text-center">
                                            <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg">Increment</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            IMAGE VERSION
                                        </td>
                                        <td className="text-center">
                                            302
                                        </td>
                                        <td className="text-center">
                                            <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg">Increment</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            LAB VERSION
                                        </th>
                                        <td className="text-center">
                                            22
                                        </td>
                                        <td className="text-center">
                                            <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg">Increment</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            LAB OUTER VERSION
                                        </th>
                                        <td className="text-center">
                                            24
                                        </td>
                                        <td className="text-center">
                                            <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg">Increment</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MartVersionConfiguration;