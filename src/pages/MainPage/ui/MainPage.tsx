import { useState } from 'react';

const MainPage = () => {
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <div>
            Main
        </div>
    );
};

export default MainPage;
