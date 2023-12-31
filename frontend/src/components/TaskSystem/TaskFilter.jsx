import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { ApiFindSpace, ApiFindSpaceMembers, ApiFindUserById, router_auth } from "../../constants";
import { useState, useEffect } from 'react';
import {getSafe} from "../../utils";

const useStyles = makeStyles((theme) => ({
  formControl: {
    position: 'absolute',
    top: '15%',
    right: '14%',
    minWidth: 100,
    height: 100,
  },
}));

export default function TaskFilter({ onChange, selectedUser }) {
  const classes = useStyles();
  const [responsibleUserFilter, setResponsibleUserFilter] = React.useState('');
  const [memberListUserFilter, setMemberListUserFilter] = useState([{ memberId: 'allUsers', userName: 'All Users' }]);    
    useEffect(() => {
      async function fetchUserData() {
        const result = await router_auth.request({
          method: 'POST',
          url: ApiFindSpaceMembers,
          headers: {'content-type': 'application/json',},
          data: {spaceId: getSafe(localStorage, "spaceId")},
        });
        setMemberListUserFilter(result.data);
        console.log("Member data checking taskfilter:", result.data);
        const allUserOption = { _id: 'off', userName: 'All Users' };
        setMemberListUserFilter([allUserOption, ...result.data])
        console.log(memberListUserFilter)
        }
      fetchUserData();
    }, []);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedUser}
          onChange={onChange}
          label=""
        >
          {memberListUserFilter.map((memberTaskFilter) => (
            <MenuItem key={memberTaskFilter._id} value={memberTaskFilter._id}>
              {memberTaskFilter.userName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}