import { AppLogo } from '@/components/common/AppLogo';
import { Body } from '@/components/layout/Body';
import { Header } from '@/components/layout/Header';
import { AppForm } from '@/components/common/AppForm';

function AddPage() {
    return (
        <>
            <Header>
                <AppLogo />
            </Header>
            <Body>
                <AppForm />
            </Body>
        </>
    );
}

export default AddPage;
