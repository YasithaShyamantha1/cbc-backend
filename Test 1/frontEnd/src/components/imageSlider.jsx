export default function ImageSlider(props){
    const images = props.images;
    return(
        <div className="w-full h-96 flex items-center flex-col relative">
            <img src ={images[0]} className="w-full aspect-square object-cover"/>
            <div className="absolute bottom-0 w-full h-[100px] backdrop-blur-lg">
                <div className="w-full h-full bg-white flex item-center justify-center">
                   {images.map((image,index)=>(
                    <img
                    key={index}
                    src={image}
                    className="w-12 h-15 object-cover  mx-2 "
                    />
                   ))}


                </div>
            </div>
            
        </div>

    );
}