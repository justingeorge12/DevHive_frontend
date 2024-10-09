
import image from '../../assets/images/page_notF.png';

function NotFound() {
  return (
    <div className="fixed inset-0 flex justify-center items-center m-10 overflow-hidden">
      <img 
        className="m-16 object-contain max-h-full max-w-full" 
        src={image} 
        alt="Not found" 
      />
    </div>
  );
}

export default NotFound;
