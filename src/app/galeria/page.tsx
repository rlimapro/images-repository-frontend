'use client'

import { Template, ImageCard }  from "@/components"
import { Image } from '@/resources'
import { useImageService } from '@/resources'
import { useState } from 'react' 

export default function GaleriaPage() {

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');

    async function searchImages() {
        console.log("Query digitada: ", query)
        console.log("Extensão selecionanda: ", extension)
        const response = await useService.buscar(query, extension);
        setImages(response);
    }

    function renderImageCard(image : Image) {
        return (
            <ImageCard key={image.url} 
                       nome={image.name} 
                       source={image.url} 
                       tamanho={image.size} 
                       dataUpload={image.uploadedAt} />
        );
    }

    function renderImagesCard() {
        return images.map(image => renderImageCard(image));
    }

    return (
        <Template>

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
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer" onClick={searchImages}>Search</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg cursor-pointer">Add new</button>
                </div>
            </section>

            <section className="grid grid-cols-4 gap-8">
                { renderImagesCard() }
            </section>
        </Template>
    );
}