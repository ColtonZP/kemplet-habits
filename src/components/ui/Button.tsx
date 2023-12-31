import { cva, VariantProps } from 'cva';

const buttonStyles = cva('rounded-md', {
    variants: {
        intent: {
            primary: 'bg-licorice text-white',
            ghost: 'bg-inherit hover:underline',
            secondary: 'bg-ghost-white',
        },
        fullWidth: {
            true: 'w-full',
        },
        align: {
            left: 'text-left',
            right: 'text-right',
            center: 'text-center',
        },
        padding: {
            normal: 'px-5 py-2',
            small: 'p-2',
        },
    },
    defaultVariants: {
        intent: 'primary',
        align: 'left',
        padding: 'normal',
    },
});

type Props = VariantProps<typeof buttonStyles> & {
    icon?: string;
};

export const Button: React.FC<Props & React.HTMLProps<HTMLButtonElement>> = ({
    children,
    icon,
    intent,
    fullWidth,
    align,
    padding,
    ...props
}) => (
    <button
        {...props}
        className={buttonStyles({ intent, fullWidth, align, padding })}
    >
        {children}
    </button>
);
