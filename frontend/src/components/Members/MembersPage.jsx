import React, {useEffect, useState} from "react";
import {
    ApiDeleteSpaceMemberSafe,
    ApiFindSpaceMembers,
    router_auth
} from "../../constants";
import {buildErrorMessage, getSafe} from "../../utils";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {StarBorder} from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import {SLayout, SMessageMain} from "../Layout/styles";
import Sidebar from "../Sidebar/Sidebar";
import Button from "@material-ui/core/Button";


function MembersPage() {
    const [members, setMembers] = useState([]);

    async function fetchSpaceMembers() {
        const result = await router_auth.request({
            method: 'POST',
            url: ApiFindSpaceMembers,
            headers: {'content-type': 'application/json',},
            data: {spaceId: getSafe(localStorage, "spaceId")},
        });
        setMembers(result.data)
    }

    useEffect(() => {
        void fetchSpaceMembers();
    }, []);


    const handleDeleteMember = async (event, memberId) => {
        event.preventDefault();  // prevent reload
        try {
            await router_auth.request({
                method: 'DELETE',
                url: ApiDeleteSpaceMemberSafe,
                headers: {'content-type': 'application/json',},
                data: {
                    spaceId: getSafe(localStorage, "spaceId"),
                    userId: getSafe(localStorage, "userId"),
                    memberId: memberId
                },
            });
        } catch (error) {
            alert(buildErrorMessage(error));
            return;
        }
        void fetchSpaceMembers()
    }


    function isYou(userId) {
        if (getSafe(localStorage, "userId") === userId) {
            return " (you)"
        }
    }

    const membersSystemPart = (
        <SMessageMain>
            <Typography variant="h6">Space members:</Typography>
            <br/>
            <List>
                {members.map((r) =>
                    <ListItem key={getSafe(r, "_id")}>
                        <ListItemText>
                            <ListItemIcon>
                                {getSafe(r, 'isAdmin') && <StarBorder/>}
                            </ListItemIcon>
                            {getSafe(r, "userName")}
                            {isYou(getSafe(r, "_id"))}
                            , email: {getSafe(r, "userEmail")}
                        </ListItemText>

                        {(!getSafe(r, 'isAdmin')) &&
                            <Button variant="contained"
                                    onClick={(event) => handleDeleteMember(event, getSafe(r, "_id"))}>
                                Delete member
                            </Button>
                        }
                    </ListItem>
                )}
            </List>
        </SMessageMain>
    )

    return (
        <SLayout>
            <Sidebar/>
            {(localStorage.hasOwnProperty("spaceId")) ? membersSystemPart : "Create, join or select a space"}
        </SLayout>
    )
}

export default MembersPage;