'use client'

import { Template, ImageCard }  from "@/components"
import { Image } from '@/resources'
import { useImageService } from '@/resources'
import { useState } from 'react' 

export default function GaleriaPage() {

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);

    return (
        <Template>
            <section className="grid grid-cols-4 gap-8">
                <ImageCard nome="{nameImage}" tamanho="10MB" dataUpload="18/03/2025" source=""/>
            </section>
        </Template>
    );
}