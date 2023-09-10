import React from 'react';

export function Header(props: React.PropsWithChildren<unknown>) {
    return <div className='header'>{props.children}</div>;
}
