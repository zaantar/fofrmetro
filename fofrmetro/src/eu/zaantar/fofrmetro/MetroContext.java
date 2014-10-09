package eu.zaantar.fofrmetro;

import java.io.InputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;


public class MetroContext {
	
	public class Direction {
		int id;
		String from;
		String to;
		
		@Override
		public String toString() {
			return from + " --> " + to;
		}
	}
	
	
	private Document resourceDoc;	
	private XPath xp;
	
	public MetroContext(InputStream resourceInputStream) throws Exception {
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db = dbf.newDocumentBuilder();
		resourceDoc = db.parse(resourceInputStream);
		
		xp = XPathFactory.newInstance().newXPath();
	}
	
	public String[] getDirectionsForLine(String lineName) throws Exception {
		NodeList directionNodes = (NodeList) xp.evaluate("/metro/line[@name='" + lineName + "']/direction", resourceDoc, XPathConstants.NODESET);
		for(int i = 0; i < directionNodes.getLength(); ++i) {
			Node directionNode = directionNodes.item(i);
			
		}
	}

}
