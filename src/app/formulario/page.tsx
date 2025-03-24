import { Button, InputText, Template } from "@/components"
import Link from "next/link";

export default function FormularioPage() {
    return (
        <Template>
            <section className="flex flex-col items-center justify-content my-5">
                <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">New Image</h5>
                <form action="">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Name *</label>
                            <InputText placeholder="Tiger" />
                        </div>

                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Tags  *</label>
                            <InputText placeholder="nature, animal, feline" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5">
                        <label className="block text-sm font-medium leading-6 text-gray-700">Image *</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                            <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                             </svg>

                             <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                                    <span>Upload image</span>
                                    <input type="file" className="sr-only" />
                                </label>
                             </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-3">
                        <Link href="/galeria">
                            <Button style="bg-red-500 hover:bg-red-300" label="Cancel" />
                        </Link>
                        <Button style="bg-blue-500 hover:bg-blue-400" type="submit" label="Save" />
                    </div>

                </form>
            </section>
        </Template>
    );
}