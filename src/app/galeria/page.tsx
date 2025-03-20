'use client'

import { Template, ImageCard }  from "@/components"
import { Image } from '@/resources'
import { useImageService } from '@/resources'
import { useState } from 'react' 

export default function GaleriaPage() {

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);

    async function searchAllImages() {
        const response = await useService.buscar();
        setImages(response);
    }

    function renderImageCard(image : Image) {
        return (
            <ImageCard nome={image.name} source={image.url} tamanho={image.size} dataUpload={image.uploadedAt} />
        );
    }

    function renderImagesCard() {
        return images.map(image => renderImageCard(image));
    }

    return (
        <Template>
            <button className="bg-gray-500 cursor-pointer" onClick={searchAllImages} >Carregar imagens</button>
            <section className="grid grid-cols-4 gap-8">
                { renderImagesCard() }
            </section>
        </Template>
    );
}