'use client'

interface ImageCardProps {
    nome?: string;
    tamanho?: number;
    dataUpload?: string;
    source?: string;
    extension?: string;
}

const ImageCard = ({nome, tamanho, dataUpload, source, extension} : ImageCardProps) => {

    function download() {
        window.open(source, '_blank');
    }

    return (
        <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2 cursor-pointer">
            <img onClick={download}
                 className="h-56 w-full object-cover rounded-t-md" src={source} alt="" />
            <div className="card-body p-4">
                <h5 className="text-x1 font-semibold mb-2 text-gray-600">{nome}</h5>
                <p className="text-gray-600">{extension}</p>
                <p className="text-gray-600">{formatBytes(tamanho)}</p>
                <p className="text-gray-600">{dataUpload}</p>
            </div>
        </div>
    );
}

function formatBytes(bytes : number = 0, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export default ImageCard;