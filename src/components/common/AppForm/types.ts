export interface AddFormProps {
    onSave: (formData: {
        name: string;
        imgUrl: string;
        isUrgent: boolean;
    }) => void;
}
