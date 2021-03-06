import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { Container, ContainerInputs } from './style';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputLogin: React.FC<InputProps> = ({
  label,
  name,
  icon: Icon,
  children,
  ...rest
}) => {
  const { fieldName, error, registerField } = useField(name);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <ContainerInputs>
        <span>{label}</span>
        <Container haveError={!!error}>
          {Icon && <Icon size={20} />}
          <textarea ref={inputRef} {...rest}>
            {children}
          </textarea>
        </Container>
      </ContainerInputs>
    </>
  );
};

export default InputLogin;
