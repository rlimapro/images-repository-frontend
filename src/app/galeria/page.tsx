'use client'

import { Template, ImageCard, Button }  from "@/components"
import { Image } from '@/resources'
import { useImageService } from '@/resources'
import { useState } from 'react' 
import Link from "next/link"

export default function GaleriaPage() {

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function searchImages() {
        setLoading(true);
        const response = await useService.buscar(query, extension);
        setImages(response);
        setLoading(false);
    }

    function renderImageCard(image : Image) {
        return (
            <ImageCard key={image.url} 
                       nome={image.name} 
                       source={image.url} 
                       tamanho={image.size} 
                       extension={image.extension}
                       dataUpload={image.uploadedAt} />
        );
    }

    function renderImagesCard() {
        return images.map(image => renderImageCard(image));
    }

    return (
        <Template loading={loading}>

            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex space-x-4">
                    <input type="text" 
                           onChange={event => setQuery(event.target.value)}
                           className="border px-4 py-2 rounded-lg text-gray-900" />
                    <select onChange={event => setExtension(event.target.value)} 
                            className="border px-4 py-2 rounded-lg text-gray-900 cursor-pointer">
                        <option value="">All formats</option> 
                        <option value="PNG">PNG</option> 
                        <option value="JPEG">JPEG</option> 
                        <option value="GIF">GIF</option>                        
                    </select>
                    <Button style="bg-blue-500 hover:bg-blue-400" label="Search" onClick={searchImages} />
                    <Link href="/formulario">
                        <Button style="bg-green-700 hover:bg-green-600" label="Add new" />
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-4 gap-8">
                { renderImagesCard() }
            </section>
        </Template>
    );
}