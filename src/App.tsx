import { FunctionComponent, useCallback, useMemo } from "react";
import {
  Box,
  Grid,
  Heading,
  HStack,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type TabInfo = {
  path: string;
  label: string;
};

const tabInfos: TabInfo[] = [
  { path: "filter-in-table", label: "Option 1" },
  { path: "filter-component", label: "Option 2" },
  { path: "simple-filter", label: "Option 3" },
];

export const App: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabIndex = useMemo(() => {
    return Math.max(
      tabInfos.findIndex(($) => location.pathname.endsWith($.path)),
      0
    );
  }, [location]);

  const handleTabsChange = useCallback(
    (index: number) => {
      navigate(tabInfos[index].path);
    },
    [navigate]
  );

  return (
    <Grid gridTemplateRows="auto auto 1fr">
      <HStack as="header" h="3rem" bg="black" color="white" p="1rem">
        <Heading as="h1" size="xl">
          Table filters
        </Heading>
      </HStack>
      <div></div>
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        variant="soft-rounded"
        p="1rem"
      >
        <TabList>
          {tabInfos.map((info, index) => (
            <Tab key={index}>{info.label}</Tab>
          ))}
        </TabList>
      </Tabs>
      <Box p="1rem">
        <Outlet />
      </Box>
    </Grid>
  );
};
