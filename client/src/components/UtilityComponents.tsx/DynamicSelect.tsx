import { FormControl, FormLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export interface DynamicSelectProps {
  label: string;
  id: string;
  name: string;
  value: string | number;
  options: (string | number)[];
  onChange: (event: SelectChangeEvent<string | number> | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({ label, id, name, value, options, onChange }) => {
  return (
    <FormControl fullWidth>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select 
            id={id} 
            name={name} 
            value={value} 
            onChange={onChange} 
            sx={{ svg: { color: "grey.500" }}}
        >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DynamicSelect;
