import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

export default function FormField({
  id,
  label,
  error,
  type = 'text',
  leftElement,
  register,
  options,
  ...rest
}) {
  const renderField = () => {
    switch (type) {
      case 'select':
        return (
          <Select id={id} {...register} {...rest}>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      case 'textarea':
        return <Textarea id={id} {...register} {...rest} />;
      default:
        return leftElement ? (
          <InputGroup>
            {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
            <Input id={id} type={type} {...register} {...rest} />
          </InputGroup>
        ) : (
          <Input id={id} type={type} {...register} {...rest} />
        );
    }
  };

  return (
    <FormControl isInvalid={!!error} mb={4}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      {renderField()}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
} 