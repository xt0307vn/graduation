import { useState, useEffect } from 'react';

export default function({ list }) {
    const [visibleSteps, setVisibleSteps] = useState([]);
    
    useEffect(() => {
        if (list?.length) {
            let index = 0;
            const interval = setInterval(() => {
                if (index < list.length) {
                    setVisibleSteps(prev => [...prev, list[index]]);
                    index++;
                } else {
                    clearInterval(interval); // Dừng hiển thị sau khi xong
                }
            }, 500); // Hiển thị từng phần tử sau mỗi 500ms (có thể điều chỉnh)
            return () => clearInterval(interval); // Dọn dẹp khi component unmount
        }
    }, [list]);
    
    return (
        <div className="grid grid-cols-2 gap-4">
            {visibleSteps.map((step, index) => step?.title?.startsWith("Bước") && (
                <div
                    className="bg-primary-200 p-4 rounded-md shadow opacity-0 animate-fadeIn"
                    key={`chatbot-box-${index}`}
                >
                    <p dangerouslySetInnerHTML={{ __html: step?.title }} className="text-xlarge font-bold"></p>
                    <p dangerouslySetInnerHTML={{ __html: step?.content }} className="text-justify chatbox-box"></p>
                </div>
            ))}
        </div>
    );
}
