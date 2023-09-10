import React from 'react';

export function Body(props: React.PropsWithChildren<unknown>) {
    return <div className='body'>{props.children}</div>;
}
