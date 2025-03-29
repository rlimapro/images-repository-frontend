'use client'

import { Button, InputText, Template, RenderIf, useNotification, FieldError } from "@/components"
import { useImageService } from '@/resources'
import Link from "next/link";
import { useFormik } from 'formik';
import { useState } from "react";
import { FormProps, formSchema, formValidationSchema } from "./formSchema"

export default function FormularioPage() {

    const[loading, setLoading] = useState<boolean>(false);
    const[imagePreview, setImagePreview] = useState<string>();
    const service = useImageService();
    const notification = useNotification();

    const formik = useFormik<FormProps>({
        initialValues: formSchema,
        onSubmit: handleSubmit,
        validationSchema: formValidationSchema
    });

    async function handleSubmit({name, tags, file} : FormProps) {
        setLoading(true);

        const formData = new FormData();
        
        formData.append("name", name);
        formData.append("tags", tags);
        formData.append("file", file);
        
        await service.salvar(formData);
        
        formik.resetForm();
        setImagePreview('');
        
        setLoading(false);

        notification.notify("Upload sent successfully!", "success")
    }

    function onFileUpload(event : React.ChangeEvent<HTMLInputElement>) {
        if(event.target.files) {
            const file = event.target.files[0];
            formik.setFieldValue("file", file);
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        } 
    }

    return (
        <Template loading={loading}>
            <section className="flex flex-col items-center justify-content my-5">
                <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">New Image</h5>
                <form onSubmit={formik.handleSubmit}>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Name *</label>
                            <InputText id="name" 
                                       placeholder="Tiger" 
                                       onChange={formik.handleChange} 
                                       value={formik.values.name}/>
                            <FieldError error={formik.errors.name} />
                        </div>

                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Tags  *</label>
                            <InputText id="tags" 
                                       placeholder="nature, animal, feline" 
                                       onChange={formik.handleChange}
                                       value={formik.values.tags} />
                            <FieldError error={formik.errors.tags} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5">
                        <label className="block text-sm font-medium leading-6 text-gray-700">Image *</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                            <RenderIf condition={!imagePreview}>
                                <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                                </svg>
                            </RenderIf>

                             <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                                    <RenderIf condition={!imagePreview}>
                                        <span>Upload image</span>
                                    </RenderIf>

                                    <RenderIf condition={!!imagePreview}>
                                        <img src={imagePreview} width={250} className="rounded-md" />
                                    </RenderIf>
                                    <input onChange={onFileUpload} type="file" className="sr-only" />
                                </label>
                             </div>
                            </div>
                        </div>
                        <div className="min-h-5 mt-1">
                            <FieldError error={formik.errors.file} />
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