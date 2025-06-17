
import { Shield, Award, FileText, Phone } from "lucide-react";

const Warranty = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Warranty Information</h1>
          <p className="text-xl text-gray-600">
            Comprehensive warranty coverage for your peace of mind
          </p>
        </div>

        {/* Warranty Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1 Year</h3>
            <p className="text-gray-600">Standard parts warranty</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2 Years</h3>
            <p className="text-gray-600">Premium parts warranty</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3 Years</h3>
            <p className="text-gray-600">Engine components</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lifetime</h3>
            <p className="text-gray-600">Select premium parts</p>
          </div>
        </div>

        {/* Warranty Details */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Warranty Coverage</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What's Covered</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Manufacturing defects in materials and workmanship</li>
                <li>Premature failure under normal operating conditions</li>
                <li>Replacement parts and labor costs (where applicable)</li>
                <li>Free technical support during warranty period</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What's Not Covered</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Normal wear and tear</li>
                <li>Damage from improper installation</li>
                <li>Modifications or alterations to the part</li>
                <li>Damage from accidents or misuse</li>
                <li>Consequential or incidental damages</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How to File a Warranty Claim</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-1">
                <li>Contact our warranty department at 1-800-AUTO-PARTS</li>
                <li>Provide proof of purchase and part number</li>
                <li>Describe the issue and provide photos if requested</li>
                <li>Follow return instructions if part needs to be inspected</li>
                <li>Receive replacement or refund upon approval</li>
              </ol>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notes</h3>
              <p className="text-blue-800">
                Warranty terms may vary by manufacturer. Specific warranty information 
                is provided with each product. Professional installation is recommended 
                to maintain warranty coverage.
              </p>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
};

export default Warranty;
